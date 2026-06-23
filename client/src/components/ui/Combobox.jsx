import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, Search, Check } from 'lucide-react';

/**
 * Generic searchable combobox for selecting from a list of objects.
 *
 * Props:
 *  - value: any           current value (matched via getValue)
 *  - onChange: (item) => void
 *  - items: Array<any>    items to choose from
 *  - getValue: (item) => string|number   key extractor (default: item.code)
 *  - getLabel: (item) => ReactNode       full label in dropdown (default: item.name)
 *  - getSearchString: (item) => string   string used for filtering (default: combined name + code + dial)
 *  - renderTrigger: (item) => ReactNode  custom trigger renderer (default: getLabel)
 *  - placeholder: string  placeholder when no value
 *  - searchPlaceholder: string
 *  - disabled: boolean
 *  - maxHeight: number
 */
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 0.85rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
  cursor: pointer;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &:hover:not(:disabled) {
    border-color: #94a3b8;
  }

  &:focus-visible {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f8fafc;
  }

  .placeholder {
    color: #94a3b8;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 12px 28px -8px rgba(15, 23, 42, 0.18);
  z-index: 50;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.9rem;
    background: transparent;
    color: #0f172a;
  }
`;

const List = styled.div`
  max-height: ${({ $max }) => $max || 280}px;
  overflow-y: auto;
`;

const Item = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.85rem;
  background: ${({ $active }) => ($active ? '#eff6ff' : 'transparent')};
  border: none;
  font-size: 0.9rem;
  color: #0f172a;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #f1f5f9;
  }
`;

const Empty = styled.div`
  padding: 1rem;
  font-size: 0.85rem;
  color: #94a3b8;
  text-align: center;
`;

const defaultGetValue = (i) => i?.code ?? i?.id ?? i?.value ?? '';
const defaultGetLabel = (i) => i?.name ?? i?.label ?? '';
const defaultGetSearch = (i) =>
  [i?.name, i?.code, i?.dial, i?.label].filter(Boolean).join(' ').toLowerCase();

const Combobox = ({
  value,
  onChange,
  items = [],
  getValue = defaultGetValue,
  getLabel = defaultGetLabel,
  getSearchString = defaultGetSearch,
  renderTrigger,
  placeholder = 'Sélectionner…',
  searchPlaceholder = 'Rechercher…',
  disabled = false,
  maxHeight,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const selectedItem = useMemo(
    () => items.find((i) => getValue(i) === value) || null,
    [items, value, getValue]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => getSearchString(i).includes(q));
  }, [items, query, getSearchString]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus the search input when opening.
  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const handleSelect = (item) => {
    onChange?.(item);
    setOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {selectedItem ? (
            renderTrigger ? (
              renderTrigger(selectedItem)
            ) : (
              getLabel(selectedItem)
            )
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={16}
          style={{
            opacity: 0.6,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        />
      </Trigger>

      {open && (
        <Dropdown role="listbox">
          <SearchRow>
            <Search size={14} color="#94a3b8" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              autoComplete="off"
            />
          </SearchRow>
          <List $max={maxHeight}>
            {filtered.length === 0 ? (
              <Empty>Aucun résultat</Empty>
            ) : (
              filtered.map((item) => {
                const v = getValue(item);
                const isActive = v === value;
                return (
                  <Item
                    type="button"
                    key={v}
                    $active={isActive}
                    onClick={() => handleSelect(item)}
                    role="option"
                    aria-selected={isActive}
                  >
                    {getLabel(item)}
                    {isActive && <Check size={14} color="#2563eb" style={{ marginLeft: 'auto' }} />}
                  </Item>
                );
              })
            )}
          </List>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default Combobox;
